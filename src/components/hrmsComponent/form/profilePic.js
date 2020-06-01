import React, { Component } from "react";
import {
  Media,
  Button,
} from "reactstrap"
import userImg from "../../../assets/img/portrait/small/avatar-s-18.jpg"
class CustomImageInput extends Component {
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
    this.showFileUpload = this.showFileUpload.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);

    this.state = {
      file: "",
      imagePreviewUrl: ""
    };
  }

  

  showFileUpload() {
    if (this.fileUpload) {
      this.fileUpload.current.click();
    }
  }

  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
      this.props.setFieldValue(this.props.field.name, file);
    }
  }

  showPreloadImage() {
    const { errorMessage} = this.props;
    const { file, imagePreviewUrl } = this.state;
    let imageUrl = errorMessage ? userImg : file ? imagePreviewUrl : userImg;
    return (
      <Media
        className="users-avatar-shadow rounded"
        object
        src={imageUrl}
        alt="user profile image"
        height="84"
        width="84"
      />
    )
    // let comp = null;

    // if (errorMessage) {
    //   comp = <Media
    //     className="users-avatar-shadow rounded"
    //     object
    //     src={userImg}
    //     alt="user profile image"
    //     height="84"
    //     width="84"
    //   />;
    // } else if (file) {
    //   comp = (
    //     <Media
    //       className="users-avatar-shadow rounded"
    //       object
    //       src={imagePreviewUrl}
    //       alt="user profile image"
    //       height="84"
    //       width="84"
    //     />
    //   );
    // } else {
    //   comp = <Media
    //     className="users-avatar-shadow rounded"
    //     object
    //     src={userImg}
    //     alt="user profile image"
    //     height="84"
    //     width="84"
    //   />;
    // }
    // return comp;
  }

  componentDidMount() {
    console.log(this.fileUpload.current);
  }

  render() {
    const { errorMessage } = this.props;
    const { name } = this.props.field;

    return (
      <div>
        <Media className="mb-2">
          <Media className="mr-2 my-25" left href="#">
            {this.showPreloadImage()}
          </Media>
          <Media className="mt-2" body>
            <div className="d-flex flex-wrap">
              <Button.Ripple className="mr-1" color="primary" outline onClick={this.showFileUpload}>
                Change
                </Button.Ripple>
            </div>
          </Media>
        </Media>
        <input
          id={name}
          name={name}
          type="file"
          onChange={this.handleImageChange}
          ref={this.fileUpload}
          style={{ display: "none" }}
        />

        {errorMessage ? (
          <p variant="caption" color="error">
            {errorMessage}
          </p>
        ) : null}
      </div>
    );
  }
}

export default CustomImageInput;
