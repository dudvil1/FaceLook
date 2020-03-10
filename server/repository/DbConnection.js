//   const connectionString =
//   "server=(localdb)\\sqlexpress;Database=FaceLook;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

///guy connection
const connectionString =process.env.SQL_CONNECTION_STRING

module.exports = connectionString;
