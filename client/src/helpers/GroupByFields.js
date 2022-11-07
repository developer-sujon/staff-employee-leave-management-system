const GroupByFields = (array: Array<any>, f: any): Array<any> => {
  var groups = {};
  array.forEach((o) => {
    var group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map((group) => {
    return groups[group];
  });
};

export { GroupByFields };
