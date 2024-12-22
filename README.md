# pweb-fp-P29-2024

# Final Project Pemrograman Website 2024

### Information Technology - Institut Teknologi Sepuluh Nopember

Kelompok P29

| Name                              |     NRP    |
| ----------------------------------|------------|
| Chelsea Vania Hariyono            | 5027231003 | 
| Gandhi Ert Julio                  | 5027231081 |
| Nabiel Nizar Anwari               | 5027231087 |

## Study Case
#### Membuat website funding dana (syariah)

Deskripsi : Website Funding Dana BisaKita merupakan sebuah situs yang mengajak para penggunanya untuk melakukan donasi pada CrowdFund pilihan mereka. Di sisi lain, admin mampu membuat CrowdFund baru dan menentukan target dari CrowdFund yang dibuat. Website Funding Dana BisaKita terdiri dari 3 bagian :
1. Home
2. Dashboard User
3. Dashboard Admin

Ketentuan lengkap bisa dilihat pada [link](https://docs.google.com/document/d/1juA2magCRLWAS2Eni9iNTsVUBvv84xdbhhatV8D7OXc/edit?usp=sharing) berikut.

## Pembagian Pengerjaan :
- Nabiel Nizar Anwari : bagian 1 (Home) 
- Gandhi Ert Julio : bagian 
- Chelsea Vania Hariyono : bagian 

## How to Use

1. Clone this repository 
```
https://github.com/bielnzar/pweb-fp-P29-2024.git
```

2. `backend` : Express JS
```
cd backend
```

Install Dependency
```
npm install
```

Setup Environment Variabel

buat file `.env` pada root folder 

isi file dengan template berikut : 
```
MONGODB_URI=mongodb+srv://[username]:[pw]@[cluster-name]/[db-name]?retryWrites=true&w=majority&appName=[]
JWT_SECRET=(....)
PORT=5000
```

Lalu, jalankan server menggunakan command berikut :
```
npm run start:dev
```

3. `frontend` : Vue JS + Tailwind CSS

Install Dependency
```
npm install
```

```
cd frontend
npm run dev
```