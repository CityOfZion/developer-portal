const routePermissions = {
    developer: [
        'reports',
        'dashboard',
        'profile',
        'report-summaries'
    ],
    maintainer: [
        'reports',
        'dashboard',
        'profile',
        'report-summaries'
    ],
    contributor: [
        'reports',
        'dashboard',
        'profile',
        'report-summaries'
    ],
    council: [
        'council',
        'dashboard',
        'profile',
        'report-summaries'
    ],
    admin: [
        'admin',
        'dashboard',
        'profile',
        'report-summaries'
    ]
};

export default routePermissions;