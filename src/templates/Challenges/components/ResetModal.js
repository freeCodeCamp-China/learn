import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Button, Modal } from 'react-bootstrap';

import ga from '../../../analytics';
import { isResetModalOpenSelector, closeModal, resetChallenge } from '../redux';

import './reset-modal.css';

const propTypes = {
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
};

const mapStateToProps = createSelector(isResetModalOpenSelector, isOpen => ({
  isOpen
}));

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { close: () => closeModal('reset'), reset: () => resetChallenge() },
    dispatch
  );

function withActions(...fns) {
  return () => fns.forEach(fn => fn());
}

function ResetModal({ reset, close, isOpen }) {
  if (isOpen) {
    ga.modalview('/reset-modal');
  }
  return (
    <Modal
      animation={false}
      dialogClassName='reset-modal'
      keyboard={true}
      onHide={close}
      show={isOpen}
      >
      <Modal.Header className='reset-modal-header' closeButton={true}>
        <Modal.Title className='text-center'>时光穿梭机</Modal.Title>
      </Modal.Header>
      <Modal.Body className='reset-modal-body'>
        <div className='text-center'>
          <p>
            重置代码后，编辑器会穿越到过去，回到初始状态。
          </p>
          <p>
            <em>但穿越到过去后，就不能再穿越到现在了哦。</em>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          block={true}
          bsSize='large'
          bsStyle='danger'
          onClick={withActions(reset, close)}
          >
          确认重置
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ResetModal.displayName = 'ResetModal';
ResetModal.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ResetModal);
