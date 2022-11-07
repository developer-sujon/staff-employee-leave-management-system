const CheckAssociateService = async (QueryObject, AssociateModel) => {
  const data = await AssociateModel.aggregate([
    {
      $match: QueryObject,
    },
  ]);

  return data.length > 0;
};

module.exports = CheckAssociateService;
