import dns from 'dns'
dns.setDefaultResultOrder('ipv4first')
import mongoose from 'mongoose';
import 'dotenv/config';

console.log('URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('✅ Conectado!'))
  .catch(e => console.log('❌ Error completo:', e));