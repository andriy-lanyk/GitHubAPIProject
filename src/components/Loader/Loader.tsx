import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "./Loader.module.scss";

function loader () {
    return <div className={styles.loader}>
        <Loader type="Circles" color = "rgb(25, 118, 210)" height = { 100} width = { 100} />
    </div>
};

export default loader;