import { createSelector } from 'reselect';
import { modalsSelector } from '../../redux';

export default createSelector(
    modalsSelector,
    modals => ({
        modalType: modals.types[0],
        modalProps: modals.props[0],
    })
);
