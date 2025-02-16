use serde_json::json;
use tauri::AppHandle;
use tauri_plugin_store::StoreExt;
use reqwest::Client;
use serde::{Serialize, Deserialize};
use std::future::Future;

#[derive(Serialize)]
struct UpdateRequest {
    document_id: String,
    file_content: String,
}

#[tauri::command]
pub async fn save(app: AppHandle, content: String, document_id: String, access_token: String) {
    println!("Saving content: {}", content);

    let client = Client::new();
    let request_body = UpdateRequest {
        document_id,
        file_content: content,
    };

    let response = client
        .patch("http://localhost:8000/secure/document")
        .bearer_auth(access_token)
        .json(&request_body)
        .send()
        .await;

    match response {
        Ok(resp) => {
            if resp.status().is_success() {
                println!("Document updated successfully");
            } else {
                println!("Failed to update document: {:?}", resp.text().await);
            }
        }
        Err(err) => {
            println!("Error occurred while updating document: {:?}", err);
        }
    }
}
