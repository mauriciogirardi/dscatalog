import './form.styles.css';

interface SelectProps {
    data: [];
    placeholder?: string;
}

export const Select = ({ data, placeholder }: SelectProps) => {
    return (
        <select className="select_flushed">
            <option value="" className="placeholder">
                {placeholder}
            </option>
            <option value="mauricio">Mauricio</option>
            <option value="josiana">Josiana</option>
            <option value="jose">Jose</option>
        </select>
    );
};
