const CreateService = async (Request, DataModel) => {
  const PostBody = Request.body;
  PostBody.EmployeeId = Request.EmployeeId;

  const data = new DataModel(PostBody);
  return await data.save();
};

module.exports = CreateService;
