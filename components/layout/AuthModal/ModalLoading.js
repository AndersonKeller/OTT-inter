import Color from 'color'
import { WHITE } from '../../../constants/colors'
import Loading from '../../Loading/Loading'

const ModalLoading = _ => (
  <>
    <div className="modal-loading">
      <Loading />
    </div>
    <style jsx>{`
      .modal-loading {
        background-color: ${Color(WHITE).fade(.2)};
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: center;
        left: 0;
        padding-bottom: 10%;
        position: absolute;
        top: 0;
        width: 100%;
      }
    `}</style>
  </>
)

export default ModalLoading
