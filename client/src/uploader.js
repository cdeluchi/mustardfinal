import React from "react";
export class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            id: this.props.id,
            file: "",
            url: "",
        };
        console.log(this.state);
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

    handleChange(e) {
        console.log(e.target.files[0]);
        this.setState({
            file: e.target.files[0],
        });
    }

    // handleChange({ target }) {
    //     console.log("handleChange", this.setState);
    //     this.setState({
    //         file: target.file[0],
    //     });
    // }
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
        const { id, file } = this.state;

        fd.append("id", id);
        fd.append("file", file);
        console.log("FD: ", fd);
        console.log("THIS STATE : ", this.state);
        console.log("this.state on handleclick", id);

        fetch("/upload", {
            method: "POST",
            body: fd,
        })
            .then((resp) => resp.json())
            // console.log("json resp", resp.json());
            .then((data) => {
                console.log("then rows", data);
                const { url } = data;
                if (data.success) {
                    this.props.uploadImage(url);
                    console.log("this.state in handleclick: ", this.state);
                    // location.reload();
                } else {
                    this.setState({
                        error: "something went wrong",
                    });
                }
            })
            .catch((err) => {
                console.log("error in catch-post-registration", err);
                this.setState({
                    error: "something went wrong",
                });
            });
    }

    // handleClick(e) {
    //     e.preventDefault();
    //     const fd = new FormData();
    //     fd.append("file", this.state.file);
    //     console.log("handleClick is running", this.state);
    //     fetch("/upload", {
    //         method: "POST",
    //         body: fd,
    //     })
    //         .then((res) => res.json())
    //         .then((res) => {
    //             console.log("POST /upload.json:", res);

    //             if (res.success) {
    //                 this.props.imgUrl(res.url);
    //             } else {
    //                 this.setState({
    //                     error: "Something went wrong",
    //                 });
    //             }
    //         })
    //         .catch((err) => {
    //             console.log("error in handleClick", err);
    //         });
    // }
    render() {
        return (
            <>
                <div className="uploaderModal">
                    <div className="closeModal" onClick={this.props.close}>
                        Close X
                    </div>
                    <form className="formModal">
                        <input
                            id="fileupload"
                            name="file"
                            type="file"
                            accept="image/*"
                            onChange={this.handleChange}
                        ></input>
                        <button onClick={this.handleClick} type="submit">
                            Upload the Image
                        </button>
                    </form>
                </div>
            </>
        );
    }
}
