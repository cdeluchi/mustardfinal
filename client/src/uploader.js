import { Component } from "react";

export class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleUploadPic = this.handlerUploadPic.bind(this);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
        // this.clickUploader = this.clickUploader.bind(this);
    }
    componentDidMount() {
        console.log("Mount Uploader");
        this.setState({
            userId: this.props.userId,
        });
    }
    // clickUploader() {
    //     console.log("clickUploader");
    //     this.setState({ uploaderIsVisible: false });
    // }

    fileSelectHandler({ target }) {
        console.log(" fileSelectHandler in ", target);
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
        const fd = new FormData();
        fd.append("file", this.state.file);
        console.log("handlerUploadPic is running", this.state);
        fetch("/uploadPic", {
            method: "POST",
            body: fd,
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    this.props.uploadImage(res.url);
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
    render() {
        return (
            <>
                <div className="uploaderModal">
                    <form>
                        <input
                            type="file"
                            className="inputfile"
                            name="file"
                            accept="image/*"
                            onChange={this.fileSelectHandler}
                        ></input>
                        <button onClick={this.handlerUploadPic} type="submit">
                            Upload the Image
                        </button>
                    </form>
                </div>
            </>
        );
    }
}
