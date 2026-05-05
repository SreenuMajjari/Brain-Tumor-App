from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
from predict import predict_image

app = FastAPI(title="Brain Tumor Classification API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"], # React default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "temp_uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/analyze")
async def analyze_mri(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")
        
    try:
        # Save file temporarily
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Run prediction
        result = predict_image(file_path)
        
        # Format the result for the frontend
        status = "Complete"
        predicted_class = result["predicted_class"]
        confidence = result["confidence"]
        
        # Generate findings/recommendations based on the prediction
        if predicted_class == "no_tumor":
            findings = "No significant anomalies detected in the provided scan."
            recommendation = "Routine follow-up in 12 months."
        else:
            formatted_class = predicted_class.capitalize()
            findings = f"Detected anomalies consistent with {formatted_class} characteristics."
            recommendation = f"Immediate neurological consultation recommended for further evaluation of {formatted_class}."
            
        # Clean up the file
        if os.path.exists(file_path):
            os.remove(file_path)
            
        return {
            "status": status,
            "predicted_class": predicted_class,
            "confidence": f"{confidence:.2f}%",
            "findings": findings,
            "recommendation": recommendation
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# ... [existing CORS setup] ...

# Mount the static frontend files
# Render will look here for the built React app
static_dir = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(static_dir):
    app.mount("/assets", StaticFiles(directory=os.path.join(static_dir, "assets")), name="assets")

# ... [existing /analyze route] ...

@app.get("/{full_path:path}")
def serve_react_app(full_path: str):
    # If the user asks for a specific file that exists, serve it
    requested_file = os.path.join(static_dir, full_path)
    if os.path.isfile(requested_file):
        return FileResponse(requested_file)
    
    # Otherwise, fallback to React's index.html for client-side routing
    index_path = os.path.join(static_dir, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    
    return {"status": "Backend is running, but React frontend build was not found in /static"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
