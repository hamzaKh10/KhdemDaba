# KhdemDaba

This folder contains the full website prototype (no backend).

## Run

Open it using a local server (because it uses JavaScript modules).

### Option A (if you have Python)

From the repo root:
- `cd frontend`
- `python -m http.server 5173`

Open:
- `http://localhost:5173`

### Option B (VS Code)

Use the **Live Server** extension and start it from `frontend/index.html`.

## What you can demo

- Roles: **Job Seeker** and **Employer**
- Profile with **skills** + CV/work samples (prototype mode)
- Job list + job details + apply
- Employer: post job + see applications
- Language switch: **EN / العربية / الدارجة** (switching reloads the page)
  - Note: **Darija is lightweight** and falls back to Arabic for missing phrases

## Demo accounts

- Job seeker: `seeker@demo.ma` / `Password123!`
- Employer: `employer@demo.ma` / `Password123!`

## Pages

- `#/` Home
- `#/jobs` Job search/list
- `#/jobs/:id` Job details + apply
- `#/login` / `#/signup`
- `#/dashboard` Seeker/Employer dashboard
- `#/profile` Profile + work samples (seeker)
- `#/employer/post` Post a job (employer)
- `#/employer/jobs` Employer jobs
- `#/employer/apps/:jobId` Employer applications
