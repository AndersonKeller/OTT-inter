const Policy = ({ policy, title }) => (
  <div className="container-fluid legal-wrapper">
    <div className="row justify-content-center">
      <div className="col-md-9">

        {/* title */}
        <h1 className="h2 legal-wrapper__title">{ title }</h1>

        {/* text */}
        <div
          className="text-justify legal-wrapper__text"
          dangerouslySetInnerHTML={{ __html: policy }}
        />

      </div>
    </div>
    <style jsx>{`
      .legal-wrapper {
        font-size: 14px;
        line-height: 1.4;
        padding-top: 30px;
        padding-bottom: 30px;
        word-break: break-word;
      }
      .legal-wrapper__title {
        margin-bottom: 20px;
      }
      .legal-wrapper__text :global(h2) {
        font-size: 1.3em;
        line-height: 1.3;
        margin-bottom: 15px;
      }
      .legal-wrapper__text :global(hr) {
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .legal-wrapper__text :global(ul) {
        padding-left: 15px;
      }
      .legal-wrapper__text :global(li) {
        margin-bottom: 10px;
      }
      @media (min-width: 768px) {
        .legal-wrapper {
          font-size: 17px;
          padding-top: 90px;
          padding-bottom: 120px;
        }
        .legal-wrapper__title {
          margin-bottom: 45px;
        }
        .legal-wrapper__text :global(ul) {
          padding-left: 30px;
        }
      }
    `}</style>
  </div>
)

export default Policy
