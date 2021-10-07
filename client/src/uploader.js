import { Component } from "react";

export class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
        this.handleUploadPic = this.handleUploadPic.bind(this);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
        this.clickUploader = this.clickUploader.bind(this);
    }
    componentDidMount() {
        console.log("Mount Uploader");
        this.setState({
            userId: this.props.userId,
        });
    }
    fileSelectHandler({ target }) {
        this.setState(
            {
                [target.name]: target.file[0],
            },
            () => {
                console.log("Uploader target");
            }
        );
    }
    handlerUploadPic(e) {
        e.preventDefault();
        const filePic = new FormData();
        filePic.append("file", this.state.file);
        fetch("/uploadPic", {
            method: "POST",
            body: filePic,
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    this.props.clickUploader(res.url);
                } else {
                    this.setState({
                        error: "Something went wrong",
                    });
                }
            })
            .catch((err) => {
                console.log("error in handlerUploadPic", err);
            });
    }
}
