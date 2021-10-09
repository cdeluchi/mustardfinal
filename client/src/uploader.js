import { Component } from "react";

export class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
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

    handleChange({ target }) {
        this.setState({
            file: target.file[0],
        });
    }
    // fileSelectHandler({ target }) {
    //     console.log(" fileSelectHandler in ", target);
    //     this.setState(
    //         {
    //             [target.name]: target.file[0],
    //         },
    //         () => {
    //             console.log("Uploader target");
    //         }
    //     );
    // }
    handleClick(e) {
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
                    this.props.newImg(res.url);
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
                    <div className="closeModal" onClick={this.props.close}>
                        Close X
                    </div>
                    <form className="formModal">
                        <input
                            id="fileUpload"
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
