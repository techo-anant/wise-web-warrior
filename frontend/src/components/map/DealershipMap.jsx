const DealershipMap = (props) => {

    const {freeMapUrl} = props
    return (
        <iframe
            title="Warriors Hub Location"
            src={freeMapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
    )
}

export default DealershipMap
