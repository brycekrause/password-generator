use serde::{Serialize, Deserialize};
use serde_json::to_writer_pretty;
use std::fs::OpenOptions;
use std::io::{BufWriter, BufReader};
use tauri::Error;

#[derive(Serialize, Deserialize)]
struct Data{
    title: String,
    login: String,
    password: String,
}

#[tauri::command]
fn appendJSON(title: &str, login: &str, password: &str) -> Result<String, Error> {
    let data = Data {
        title: title.to_string(),
        login: login.to_string(),
        password: password.to_string(),
    };

    let file = OpenOptions::new()
        .write(true)
        .append(true)
        .create(true)
        .open("data.json")
        .map_err(|e| Error::from(e))?;
    let writer = BufWriter::new(file);
    to_writer_pretty(writer, &data)
        .map_err(|e| Error::from(e))?;

    Ok("Data appended".to_string())
}

#[tauri::command]
fn readJSON() -> Result<Data, Error> {
    let file = OpenOptions::new()
        .read(true)
        .open("data.json")
        .map_err(|e| Error::from(e))?;
    let reader = BufReader::new(file);
    let data: Data = serde_json::from_reader(reader)
        .map_err(|e| Error::from(e))?;
    Ok(data)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![appendJSON, readJSON])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


