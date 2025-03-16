const testResponse = (req, res) => {
  res.status(200).json({
    message: "Test route working successfully",
    status: "Success",
  });
};

const testError = (req, res) => {
  res.status(500).json({
    message: "Something went wrong.",
    status: "Error",
  });
};

module.exports = { testResponse, testError };
