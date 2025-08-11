import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true }, 

    // —— Welcome 问卷字段 —— //
    AppDegree:         { type: [String], default: [] },
    multipleCountries: { type: [String], default: [] },
    scholarshipInterested: { type: [String], default: [] },
    field:             { type: [String], default: [] },
    DreamCountrySchool:{ type: [String], default: [] },
    targetDetails:     { type: String, default: '' },
    budgetPreference:  { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Student = mongoose.model('Student', StudentSchema);
