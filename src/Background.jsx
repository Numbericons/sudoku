import React from 'react';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

class Background extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      image: "",
      // loaderColor: "#36d7b7"
      // loaderColor: "#3B5245"
      loaderColor: "#5d3e02"
      // loaderColor: "black"
    }
    // this.setLoading = this.setLoading.bind(this);
  }

  // setLoading(boolean) {
  //   this.setState({ loading: boolean });
  // }

  componentDidMount() {
    this.setState({
      image: `background${this.props.value}.webp`
    })
  }

  loader() {
    if (this.state.loading) return (
      <div className="modal-background-imgBox-spinner-cont">
        < ClimbingBoxLoader
          color = { this.state.loaderColor }
          loading = "true"
          className = 'modal-background-imgBox-spinner'
          size = { '1.6vh' }
          aria-label="Loading Spinner" />
      </div>
    )
    
    return <div/>
  }

  render() {
    const style = !this.state.loading ? {} : { visibility: 'hidden' }

    const loader = this.loader();
    
    return (
      <div className='modal-background-imgBox' >
        {loader}

        <img
          className='modal-background-imgBox-img'
          src={this.state.image}
          onClick={this.props.clickProp}
          value={this.props.value}
          style={style}
          alt='imgBox-img'
          onLoad={() => this.setState({ loading: false })}
        />
      </div>
      
      // <div>
      //   <div style={{ display: loading ? "block" : "none" }}>
      //     {/* <ClimbingBoxLoader
      //     color={loaderColor}
      //     loading="true"
      //     size={20}
      //     aria-label="Loading Spinner"
      //   // /> */}
      //   </div>
      //   <div style={{ display: loading ? "none" : "block" }}>
      //     <img
      //       className='modal-background-img'
      //       src={this.state.image}
      //       onClick={this.props.clickProp}
      //       value={value}
      //     // onLoad={() => this.setLoading(false)}
      //     />
      //   </div>
      // </div>
    )
  }
}

export default Background;