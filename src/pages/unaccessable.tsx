import './styles.scss'


const Unaccessable = () => {

    return <>
        <div className="error-page">
            <p>Сайт не предназначен для мобильных устройств</p>
            <p>Попробуй зайди на</p>
            <p>&gt; <a href='https://digital-kunstkamera.ru'>https://digital-kunstkamera.ru</a> &lt;</p>
            <p>через планшет, ноутбук или компьютер</p>
        </div>
    </>
}

export default Unaccessable;