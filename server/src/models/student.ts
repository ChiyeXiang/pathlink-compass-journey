import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true }, 

    // —— Welcome 问卷字段 —— //
    AppDegree:         { type: [String], default: [] },
    field:             { type: [String], default: [] },
    multipleCountries: { type: [String], default: [] },
    DreamCountrySchool:{ type: [String], default: [] },
    needs:             { type: [String], default: [] },
    targetDetails:     { type: String, default: '' },
    budgetPreference:  { type: [String], default: [] },

    // —— ProfileSetup 学生基本资料 —— //
    name:      { type: String, default: '' },
    phone:          { type: String, default: '' },
    university:     { type: String, default: '' },
    major:          { type: String, default: '' },
    graduationYear: { type: String, default: '' },
    gpa:            { type: String, default: '' },
    experience:     { type: String, default: '' },
    interests:      { type: String, default: '' },
    goals:          { type: String, default: '' },
  },
  
  { timestamps: true , versionKey: false}
);

export const Student = mongoose.model('Student', StudentSchema);
