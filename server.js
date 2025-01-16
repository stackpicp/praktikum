import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json()); // Memastikan body dikirimkan dalam format JSON

// Data dummy untuk testing
let posts = [
  { id: 1, title: 'Post 1', body: 'This is the first post.' },
];

// Rute GET untuk mengambil semua post
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Rute POST untuk menambah post baru
app.post('/api/posts', (req, res) => {
  const newPost = req.body;  // Mengambil data dari request body
  newPost.id = posts.length + 1;  // Menambahkan ID unik untuk post baru
  posts.push(newPost);  // Menambahkan post baru ke array
  res.status(201).json(newPost);  // Mengirimkan response dengan post baru
});

// Rute PUT untuk mengedit post berdasarkan ID
app.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;  // Mengambil ID dari URL parameter
  const updatedPost = req.body;  // Mengambil data yang ingin diupdate dari request body

  // Mencari post yang akan diupdate
  let post = posts.find(p => p.id == id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  // Update post
  post.title = updatedPost.title || post.title;
  post.body = updatedPost.body || post.body;

  res.json(post);  // Mengirimkan post yang sudah diperbarui
});

// Rute DELETE untuk menghapus post berdasarkan ID
app.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;  // Mengambil ID dari URL parameter

  // Mencari dan menghapus post berdasarkan ID
  const postIndex = posts.findIndex(p => p.id == id);
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  // Menghapus post dari array
  const deletedPost = posts.splice(postIndex, 1);

  res.json({ message: 'Post deleted', post: deletedPost[0] });  // Mengirimkan respons bahwa post berhasil dihapus
});

// Menjalankan server pada port 5000
app.listen(8000, () => {
  console.log('Server running on http://127.0.0.1:8000');
});
