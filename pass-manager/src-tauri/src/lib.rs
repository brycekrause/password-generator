use serde::{Serialize, Deserialize};
use serde_json::{to_writer_pretty, from_reader, Value};
use std::fs::OpenOptions;
use std::io::{BufWriter, BufReader, Seek, SeekFrom};
use tauri::Error;

#[derive(Serialize, Deserialize)]
struct Data{
    title: String,
    login: String,
    password: String,
}

#[tauri::command]
fn append_json(title: &str, login: &str, password: &str) -> Result<String, Error> {
    let data = Data {
        title: title.to_string(),
        login: login.to_string(),
        password: password.to_string(),
    };

    {
        let mut file = OpenOptions::new()
            .read(true)
            .write(true)
            .create(true)
            .open("data.json")
            .map_err(|e| Error::from(e))?;

        let mut reader = BufReader::new(&file);
        let mut json_data: Value = match from_reader(&mut reader) {
            Ok(value) => value,
            Err(e) => {
                eprintln!("Failed to read JSON data: {:?}", e);
                Value::Array(vec![])
            },
        };

        if let Value::Array(ref mut arr) = json_data {
            arr.push(serde_json::to_value(&data).map_err(|e| {
                eprintln!("Failed to convert data to JSON value: {:?}", e);
                Error::from(e)
            })?);
        }

        file.set_len(0).map_err(|e| {
            eprintln!("Failed to truncate file: {:?}", e);
            Error::from(e)
        })?;
        file.seek(SeekFrom::Start(0)).map_err(|e| {
            eprintln!("Failed to seek to start of file: {:?}", e);
            Error::from(e)
        })?;

        let writer = BufWriter::new(file);
        to_writer_pretty(writer, &json_data).map_err(|e| {
            eprintln!("Failed to write JSON data: {:?}", e);
            Error::from(e)
        })?;
    }

    println!("Data appended successfully");
    Ok("Data appended".to_string())
}

#[tauri::command]
fn read_json() -> Result<Vec<Data>, Error> {
    let file = OpenOptions::new()
        .read(true)
        .open("data.json")
        .map_err(|e| Error::from(e))?;
    let reader = BufReader::new(file);
    let data: Vec<Data> = serde_json::from_reader(reader)
        .map_err(|e| Error::from(e))?;
    Ok(data)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![append_json, read_json])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


