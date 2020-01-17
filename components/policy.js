

const Policy = ({title, policy}) => (
        <div className="legal-wrapper">
        <div className="policy container">
            <h3 className="h3 text-uppercase legal-title">{ title }</h3>
            <div className="legal-text">
                <div dangerouslySetInnerHTML={ { __html: policy } }></div>
            </div>
        </div>
      <style jsx>{`
        .legal-title {
            padding-top: 10px;
        }
       .h3 {
           color: #000;
           font-size: 32px;
           font-weight: 700;
           line-height: 48px;
       }
       .legal-text {
           color: #000;
           font-family: var(--sans-serif);
           font-size: 17px;
           font-weight:300;
           line-height: 28px;
           margin: 0 0 16px;
           word-break: break-word;
           padding-bottom: 10px;
       }
      `}</style>
        </div>
  );

export default Policy
