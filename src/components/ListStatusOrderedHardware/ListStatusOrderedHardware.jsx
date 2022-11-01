import React from 'react';
import { useDispatch } from 'react-redux';
import { useGetStatusOrderedQuery } from '../../api/apiQuery';
import { setShowModal, setStatusId, setVarSendMethod } from '../pages/ListStatus/listStatusSlice';

const ListStatusOrderedHardware = () => {

    const { 
        data: hardware = [], 
        isLoading, 
        isError 
    } = useGetStatusOrderedQuery();

    // const [delHardware] = useDeleteStatusReparedMutation();

    const dispatch = useDispatch();

    // const deletingHardwareById = (id) => {
    //     delHardware(id);
    // };

    const openModal = (id, method = 'PUT') => {
        dispatch(setShowModal(true));
        dispatch(setStatusId(id));
        dispatch(setVarSendMethod(method));
    };

    const listCreatings = (hardware) => {
        if (hardware.length === 0) {
            return (
                <tr className="list-status__empty">
                    <td>Статусов нет</td>
                </tr>
            );
        }

        return hardware.map(({ id, nameHardware, date, statusFix }) => (
            <tr key={id}>
                <td>{nameHardware}</td>
                <td>{date}</td>
                <td>{statusFix}</td>
                <td className="list-status__wrapper-management">
                    <button
                        className="btn btn-warning list-status__btn list-status__btn_small"
                        onClick={() => openModal(id)}>
                        Внести изменения
                    </button>
                    <button
                        className="btn btn-danger list-status__btn list-status__btn_small"
                        // onClick={() => deletingHardwareById(id)}
                        >
                        Удалить
                    </button>
                </td>
            </tr>
        ));
    };

    const list = listCreatings(hardware);

    return list;
};

export default ListStatusOrderedHardware;