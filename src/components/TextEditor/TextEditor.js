import ReactQuill from 'react-quill'; // ES6

export default function TextEditor(props) {
  const { placeholder, value, onChange } = props;

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: ['white', 'black', 'red', 'blue', '#50d450'] }],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'color'
  ];

  return (
    <div>
      <ReactQuill
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
      ></ReactQuill>
    </div>
  );
}
