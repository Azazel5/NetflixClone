import { Component } from "react";
import { withRouter } from "react-router-dom";

/**
 * A simple hoc as shown in the react router documentation
 * sample which does nothing but restore window scroll
 * position when going to and fro from links.
 */
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
