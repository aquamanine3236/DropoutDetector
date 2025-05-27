from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import json
from sklearn.preprocessing import RobustScaler, StandardScaler
import joblib
import logging
from fastapi.middleware.cors import CORSMiddleware

# Khởi tạo FastAPI
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Định nghĩa mô hình Pydantic cho dữ liệu đầu vào
class StudentData(BaseModel):
    marital_status: str
    nationality: str
    gender: str
    daytime_evening_attendance: str
    tuition_fees_up_to_date: str
    scholarship_holder: str
    previous_qualification_grouped: str
    mother_qualification_grouped: str
    father_qualification_grouped: str
    mother_occupation_grouped: str
    father_occupation_grouped: str
    application_mode_grouped: str
    course_grouped: str
    application_order: str
    previous_qualification_grade: str
    admission_grade: str
    age_at_enrollment: str
    curricular_units_1st_sem_enrolled: str
    curricular_units_1st_sem_approved: str
    curricular_units_1st_sem_grade: str
    curricular_units_1st_sem_evaluations: str
    curricular_units_2nd_sem_enrolled: str
    curricular_units_2nd_sem_evaluations: str
    curricular_units_2nd_sem_approved: str
    curricular_units_2nd_sem_grade: str
    gdp: str
    debtor: str
    displaced: str

# Tải mô hình và các scaler
try:
    model = joblib.load('random_forest_model.joblib')
    robust_scaler = joblib.load('scaler_1.joblib')
    standard_scaler = joblib.load('scaler.joblib')
except Exception as e:
    logging.error(f"Error loading model or scalers: {e}")
    raise Exception("Model or scalers not found")

# Danh sách các cột số cần chuẩn hóa bằng RobustScaler
numerical_cols = [
    'Age at enrollment', 'Previous qualification (grade)',
                  'Curricular units 1st sem (grade)', 'Curricular units 2nd sem (grade)',
                  'Admission grade', 'GDP'
]

# Danh sách tất cả các cột đặc trưng (28 cột)
all_columns = [
    'Application order', 'Previous qualification (grade)', 'Admission grade',
    'Age at enrollment', 'Curricular units 1st sem (enrolled)',
    'Curricular units 1st sem (approved)', 'Curricular units 1st sem (grade)',
    'Curricular units 2nd sem (enrolled)', 'Curricular units 2nd sem (evaluations)',
    'Curricular units 2nd sem (approved)', 'Curricular units 2nd sem (grade)', 'GDP',
    'Marital_married_union', 'Marital_single', 'Gender_encoded',
    'Daytime/evening attendance_encoded', 'Tuition fees up to date_encoded',
    'Scholarship holder_encoded', 'Mother_occupation_grouped_Student',
    'Father_occupation_grouped_Student', 'Application_mode_grouped_General Contingent',
    'Application_mode_grouped_Over 23', 'Course_grouped_Health',
    'Course_grouped_Management', 'Course_grouped_Social', 'Course_grouped_Technical',
    'max_parent_qual', 'at_risk', 
]

# Hàm xử lý dữ liệu
def process_data(input_data: StudentData):
    # Chuyển Pydantic object thành dictionary
    data = input_data.dict()

    # Khởi tạo dictionary cho output DataFrame
    processed_data = {
        'Application order': int(data['application_order']),
        'Previous qualification (grade)': float(data['previous_qualification_grade']),
        'Admission grade': float(data['admission_grade']),
        'Age at enrollment': int(data['age_at_enrollment']),
        'Curricular units 1st sem (enrolled)': int(data['curricular_units_1st_sem_enrolled']),
        'Curricular units 1st sem (approved)': int(data['curricular_units_1st_sem_approved']),
        'Curricular units 1st sem (grade)': float(data['curricular_units_1st_sem_grade']),
        'Curricular units 2nd sem (enrolled)': int(data['curricular_units_2nd_sem_enrolled']),
        'Curricular units 2nd sem (evaluations)': int(data['curricular_units_2nd_sem_evaluations']),
        'Curricular units 2nd sem (approved)': int(data['curricular_units_2nd_sem_approved']),
        'Curricular units 2nd sem (grade)': float(data['curricular_units_2nd_sem_grade']),
        'GDP': float(data['gdp']),
        
        # Marital status encoding
        'Marital_married_union': 1 if data['marital_status'] == 'Married/Union' else 0,
        'Marital_single': 1 if data['marital_status'] == 'Single' else 0,
        
        # Gender encoding
        'Gender_encoded': int(data['gender']),
        
        # Daytime/evening attendance encoding
        'Daytime/evening attendance_encoded': int(data['daytime_evening_attendance']),
        
        # Tuition fees encoding
        'Tuition fees up to date_encoded': int(data['tuition_fees_up_to_date']),
        
        # Scholarship holder encoding
        'Scholarship holder_encoded': int(data['scholarship_holder']),
        
        # Parent qualification
        'max_parent_qual': max(int(data['mother_qualification_grouped']), 
                              int(data['father_qualification_grouped'])),
        
        # Parent occupation encoding
        'Mother_occupation_grouped_Student': 1 if data['mother_occupation_grouped'] == 'Student' else 0,
        'Father_occupation_grouped_Student': 1 if data['father_occupation_grouped'] == 'Student' else 0,
        
        # Application mode encoding
        'Application_mode_grouped_General Contingent': 1 if data['application_mode_grouped'] == 'General Contingent' else 0,
        'Application_mode_grouped_Over 23': 1 if data['application_mode_grouped'] == 'Over 23' else 0,
        
        # Course encoding
        'Course_grouped_Health': 1 if data['course_grouped'] == 'Health' else 0,
        'Course_grouped_Management': 1 if data['course_grouped'] == 'Management' else 0,
        'Course_grouped_Social': 1 if data['course_grouped'] == 'Social' else 0,
        'Course_grouped_Technical': 1 if data['course_grouped'] == 'Technical' else 0,
        
        # At risk calculation
        'at_risk': int(data['debtor']) | int(data['displaced'])
    }
    
    # Tạo DataFrame từ dictionary
    df = pd.DataFrame([processed_data])
    
    # Đảm bảo đúng kiểu dữ liệu
    numeric_columns = [
        'Application order', 'Previous qualification (grade)', 'Admission grade',
        'Age at enrollment', 'Curricular units 1st sem (enrolled)',
        'Curricular units 1st sem (approved)', 'Curricular units 1st sem (grade)',
        'Curricular units 2nd sem (enrolled)', 'Curricular units 2nd sem (evaluations)',
        'Curricular units 2nd sem (approved)', 'Curricular units 2nd sem (grade)', 'GDP'
    ]
    
    for col in numeric_columns:
        df[col] = pd.to_numeric(df[col], errors='coerce')
    
    # Đảm bảo các cột binary là int
    binary_columns = [
        'Marital_married_union', 'Marital_single', 'Gender_encoded',
        'Daytime/evening attendance_encoded', 'Tuition fees up to date_encoded',
        'Scholarship holder_encoded', 'Mother_occupation_grouped_Student',
        'Father_occupation_grouped_Student', 'Application_mode_grouped_General Contingent',
        'Application_mode_grouped_Over 23', 'Course_grouped_Health',
        'Course_grouped_Management', 'Course_grouped_Social', 'Course_grouped_Technical',
        'at_risk', 'max_parent_qual'
    ]
    
    for col in binary_columns:
        df[col] = df[col].astype(int)
    
    # Đảm bảo thứ tự cột
    df = df[all_columns]
    
    # Bước 1: Chuẩn hóa các cột số bằng RobustScaler
    df[numerical_cols] = robust_scaler.transform(df[numerical_cols])
    
    # Bước 2: Chuẩn hóa tất cả các cột bằng StandardScaler
    df[all_columns] = standard_scaler.transform(df[all_columns])
    
    return df

# API endpoint để dự đoán
@app.post("/predict")
async def predict(data: StudentData):
    try:
        # Xử lý dữ liệu
        processed_data = process_data(data)
        logging.info(f"Processed data columns: {processed_data.columns.tolist()}")
        # Dự đoán
        prediction = model.predict(processed_data)[0]
        prediction_proba = model.predict_proba(processed_data)[0]

        # Ánh xạ dự đoán thành nhãn
        labels = ['Dropout', 'Enrolled', 'Graduate']
        predicted_label = labels[prediction]

        # Chuẩn bị phản hồi
        response = {
            "message": f"The predicted academic outcome is: {predicted_label}",
            "probabilities": {
                labels[i]: float(proba) for i, proba in enumerate(prediction_proba)
            }
        }

        return response

    except Exception as e:
        logging.error(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))