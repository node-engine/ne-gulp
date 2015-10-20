if (process.env.NE_AUTO) {
    var React = require(process.env.NE_AUTO).react
}
else {
    var React = require("react")
}

class Footer extends React.Component {

    render(){
        return (
            <footer className="section" id="section-footer">
                <center>
                    <small>Copyright © 2015</small>
                </center>
            </footer>
        )
    }
}

export default Footer;