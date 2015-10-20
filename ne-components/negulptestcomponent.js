var neAuto;
if (process.env.NE_AUTO) {
    neAuto = process.env.NE_AUTO
}
else {
    neAuto = "ne-auto-off"
}

var React = require(neAuto).react || require('react');

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