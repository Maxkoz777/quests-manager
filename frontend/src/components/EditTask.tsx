interface Prop {
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditTask = ({ setShowEditForm }: Prop) => {
  setTimeout(() => {
    setShowEditForm(false);
  }, 3000);
  return <>Hello world</>;
};
