# Tutorial Membuat Restfull Api di type Script

# INstall package zod untuk validation
npm install zod

# Package express
npm install express

# tambahkan autocomplete untuk express
npm install --save-dev @types/express

# prisma unutk orm
npm install --save-dev prisma

# untuk logging atau logger pakai winston, bang kenapa gak pakai console info, winston punya asyncronus logging biar log ratusan pun tetep bisa kalau pakai console.log 100 error bersamaan maka meledak tu api lu.
npm install winston

# bcrypt untuk hashing dan tambahkan autocompletenya
npm install bcrypt

# autocomplete bcrpyt
npm install --save-dev @types/bcrypt

# package uuid
npm install uuid

# autocomplete
npm install --save-dev @types/uuid

# jest untuk unit test
npm install --save-dev jest @types/jest

# babel untuk compiler
npm install --save-dev babel-jest @babel/preset-env

# setup babel, masukkan ini ke dalam package.json, pada bagian "scripts"

"scripts": {
    "test": "jest"
  },
  "jest": {
    "transform": {
      "^.+\\.[t|j]sx?$": "babel-jest"
    }
  }

# buat file babel.config.json dan tambahkan configurasi di bawah ini

  {
  "presets": ["@babel/preset-env"]
}

# tambahkan typescipt untuk jest

npm install --save-dev @babel/preset-typescript
npm install --save-dev @jest/globals

# setup config untuk jest, masukkan ini ke dalam babel.config.json

 "@babel/preset-typescript"

 # tambahkan libaray superttest untuk testing expressnya

 npm install --save-dev supertest @types/supertest

 # lalu tambahkan typescript 

npm install --save-dev typescript

# config untuk ts nya

 # npx tsc --init
# ubah "module" ke "commonjs" dan pastikan dia itu commonjs
 # ubah "moduleResolution" ke "Node"
# tambahkan include "src/**/*"
"include": [
    "src/**/*",
  ],
# ubah outDir menjadi "./dist"
