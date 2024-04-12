export default (name, value, overrideExisting = false) => {
    const searchParams = new URLSearchParams(window.location.search);
    const method = overrideExisting ? 'set' : 'append';
    searchParams[method](name, value);
    window.history.pushState(
        {},
        '',
        `${window.location.pathname}?${searchParams.toString()}${window.location.hash ? '#' : ''}${window.location.hash}`,
    );
};
