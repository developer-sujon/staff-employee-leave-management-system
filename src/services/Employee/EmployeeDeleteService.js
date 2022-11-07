const EmployeeDeleteService = async (Request, DataModel) => {
  const { Email } = Request;
  await DataModel.deleteOne({ Email: Email });
  return { message: "Employee Delete Successfull" };
};
module.exports = EmployeeDeleteService;
