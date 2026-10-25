console.log("Employee backend setup");

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err.message));

// Employee schema

const employeeSchema = new mongoose.Schema({
  name: String,
  designation: String,
  location: String,
  salary: Number
});

const Employee = mongoose.model("Employee", employeeSchema);

// GET all employees
app.get("/api/employees", async (req, res) => {
  try {
    res.json(await Employee.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one employee
app.get("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Not found" });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

 // POST new employee
app.post("/api/employees", async (req, res) => {
  try {
    console.log("Received employee data:", req.body);

    const employee = await Employee.create({
      name: req.body.name,
      designation: req.body.designation,
      location: req.body.location,
      salary: Number(req.body.salary)
    });

    res.status(201).json(employee);
  } catch (err) {
    console.error("Error saving employee:", err);
    res.status(400).json({ message: err.message });
  }
});



// PUT update employee
app.put("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!employee) return res.status(404).json({ message: "Not found" });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE employee
app.delete("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

