const success = (res, data, message = "Success", statusCode = 200) => {
  res.status(statusCode).json({ success: true, message, data });
};

const created = (res, data, message = "Created successfully") => {
  success(res, data, message, 201);
};

const deleted = (res, message = "Deleted successfully") => {
  res.status(200).json({ success: true, message });
};

module.exports = { success, created, deleted };
