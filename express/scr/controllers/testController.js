export const testEndPoint = async (req, res) => {
  res.status(200).send({
    test: 'this is just a test',
  })
}
