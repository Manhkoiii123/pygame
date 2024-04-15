import { Modal } from "antd";
import React from "react";
interface TProps {
  openDelete: boolean;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalDelete = (props: TProps) => {
  const { openDelete, setOpenDelete } = props;
  return (
    <Modal
      footer={null}
      title="Basic Modal"
      open={openDelete}
      onCancel={() => {
        setOpenDelete(false);
      }}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default ModalDelete;
