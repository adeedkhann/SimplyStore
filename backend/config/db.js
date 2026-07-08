import mongoose from "mongoose"
import dns from "dns"

// Some ISPs (e.g. Reliance Jio) don't resolve DNS SRV records reliably
// for Node's c-ares resolver, even though the system resolver works fine.
// Pointing at Google's public DNS avoids ECONNREFUSED on mongodb+srv:// lookups.
dns.setServers(["8.8.8.8", "8.8.4.4"])

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(` MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(` Error: ${error.message}`);
        process.exit(1); 
    }
};

export default connectDB;