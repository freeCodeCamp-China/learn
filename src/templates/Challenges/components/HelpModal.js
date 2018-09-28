import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

import ga from '../../../analytics';
import { createQuestion, closeModal, isHelpModalOpenSelector } from '../redux';

const mapStateToProps = state => ({ isOpen: isHelpModalOpenSelector(state) });
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { createQuestion, closeHelpModal: () => closeModal('help') },
    dispatch
  );

const propTypes = {
  closeHelpModal: PropTypes.func.isRequired,
  createQuestion: PropTypes.func.isRequired,
  isOpen: PropTypes.bool
};

const RSA =
  'https://forum.freecodecamp.one/t/topic/157';

export class HelpModal extends PureComponent {
  render() {
    const { isOpen, closeHelpModal, createQuestion } = this.props;
    if (isOpen) {
      ga.modalview('/help-modal');
    }
    return (
      <Modal onHide={closeHelpModal} show={isOpen}>
        <Modal.Header
          className='help-modal-header fcc-modal'
          closeButton={true}
          >
          <Modal.Title className='text-center'>每只老鸟都是从菜鸟阶段走过来的</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <h3>
            如果你通过 &nbsp;
            <a href={RSA} target='_blank' title='Read, search, ask'>
              Read-Search-Ask
            </a>&nbsp; 方法依然不能解决问题，你最后还可以在社区论坛上求助。
          </h3>
          <Button
            block={true}
            bsSize='lg'
            bsStyle='primary'
            onClick={createQuestion}
            >
            在社区论坛发布一个求助帖子。
          </Button>
          <Button
            block={true}
            bsSize='lg'
            bsStyle='primary'
            onClick={closeHelpModal}
            >
            我突然找到了解决办法，不用求助了。
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}

HelpModal.displayName = 'HelpModal';
HelpModal.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(HelpModal);
