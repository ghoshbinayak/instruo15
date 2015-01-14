from django.conf.urls import patterns, include, url
from django.contrib import admin
from instruo import settings

urlpatterns = patterns('',
                       # Examples:
                       # url(r'^$', 'instruo.views.home', name='home'),
                       # url(r'^blog/', include('blog.urls')),

                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^accounts/',
                           include('accounts.urls', namespace='accounts')),
                       url(r'^events/',
                           include('events.urls', namespace='events')),
                       url(r'^home/',
                           include('main.urls', namespace='main')),
                       )

if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += patterns('',
                            (r'^media/(?P<path>.*)$',
                             'django.views.static.serve', {
                                 'document_root': settings.MEDIA_ROOT}))
