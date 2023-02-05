exports.postSignup = (req, res) => {
    // console.log(req)

    console.log(req.cookies)
    
    res.cookie('nodejs_test', 'HelloWorld')
    res.send("<h1>Works</h1>")
    res.end()
    
}
