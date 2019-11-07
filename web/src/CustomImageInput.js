import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

const style = theme => ({
  hidden: { display: 'none' },
  bigAvatar: {
    margin: 'auto',
    width: 60,
    height: 60,
    borderColor: theme.palette.primary.main,
    borderStyle: 'solid',
    borderSize: '1px',
    cursor: 'pointer',
  },
  avatarThumb: {
    maxWidth: 60,
    maxHeight: 60,
  },
  primaryBack: {
    background: theme.palette.primary.main,
  },
  whiteBack: {
    background: 'white',
  },

  errorBack: { background: theme.palette.error.main },
});

class CustomImageInput extends Component {
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
    this.showFileUpload = this.showFileUpload.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  state = {
    file: undefined,
    imagePreviewUrl: undefined,
  };

  showFileUpload() {
    if (this.fileUpload) {
      this.fileUpload.current.click()
    }
  }

  handleImageChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
        })
      };
      reader.readAsDataURL(file);
      this.props.setFieldValue(this.props.field.name, file)
    }
  }

  showPreloadImage() {
    const { errorMessage, classes } = this.props;
    const { file, imagePreviewUrl } = this.state;

    let comp = null;

    if (errorMessage) {
      comp = <ErrorOutlineIcon style={{ fontSize: 30 }} />
    } else if (file) {
      comp = <img className={classes.avatarThumb} src={imagePreviewUrl} alt="avatar" />
    } else {
      comp = <PhotoCameraIcon style={{ fontSize: 30 }} />
    }
    return comp
  }

  render() {
    const { errorMessage, classes } = this.props;
    const { name } = this.props.field;

    const avatarStyle = classNames(classes.bigAvatar, this.state.file ? [classes.whiteBack] : [classes.primaryBack], {
      [classes.errorBack]: errorMessage,
    });

    return (
      <>
        <input
          className={classes.hidden}
          id={name}
          name={name}
          type="file"
          accept="image/*"
          onChange={this.handleImageChange}
          ref={this.fileUpload}
        />
        <Avatar className={avatarStyle} onClick={this.showFileUpload}>
          {this.showPreloadImage()}
        </Avatar>

        {errorMessage ? (
          <Typography variant="caption" color="error">
            {errorMessage}
          </Typography>
        ) : null}
      </>
    )
  }
}

export default withStyles(style)(CustomImageInput);
