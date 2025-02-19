import {PIApiFeed} from '../../types/podcast_index';

const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString();
};

const PodcastFeedDisplay: React.FC<PIApiFeed> = (feed) => {  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-48 h-48 flex-shrink-0">
          {feed.image ? (
            <img
              src={feed.image}
              alt={feed.title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-4xl text-gray-400">🎙️</span>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{feed.title}</h1>
          <p className="text-gray-600 mb-4">{feed.description}</p>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
              <span className="text-sm text-gray-600">{feed.language.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Attribution</h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Author:</span> {feed.author || 'Not specified'}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Owner:</span> {feed.ownerName || 'Not specified'}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Generator:</span> {feed.generator}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Timing Information</h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Last Updated:</span> {formatDate(feed.lastUpdateTime)}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Last Parsed:</span> {formatDate(feed.lastParseTime)}
            </p>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Links</h2>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">Website:</span>{' '}
            <a href={feed.link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              {feed.link}
            </a>
          </p>
          <p className="text-sm">
            <span className="font-medium">Feed URL:</span>{' '}
            <a href={feed.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              {feed.url}
            </a>
          </p>          
        </div>
      </div>
    </div>
  );
};

export default PodcastFeedDisplay;