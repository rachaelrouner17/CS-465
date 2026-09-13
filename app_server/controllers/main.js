/* GET home page. */

const index = (req, res) => {
  res.render("index", { Title: "Travlr Getaways" });
};

module.exports = {
  index,
}
