# KhdemDaba

Website prototype.

## Run

Open it via a local server (not `file://`).

### Option A (if you have Python)

From the repo root:
- `cd frontend`
- `python -m http.server 5173`

Open:
- `http://localhost:5173`

### Option B (VS Code)

Use the **Live Server** extension and start it from `frontend/index.html`.

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
